from fastapi import Request, status
from fastapi.responses import JSONResponse
from fastapi.exceptions import RequestValidationError
from starlette.exceptions import HTTPException as StarletteHTTPException
import logging

logger = logging.getLogger(__name__)

async def http_exception_handler(request: Request, exc: StarletteHTTPException):
    """
    Centralized handler for HTTPExceptions.
    """
    return JSONResponse(
        status_code=exc.status_code,
        content={
            "success": False,
            "error": {
                "code": exc.status_code,
                "message": exc.detail,
                "type": "HTTPException"
            },
            "data": None
        },
    )

async def validation_exception_handler(request: Request, exc: RequestValidationError):
    """
    Centralized handler for Pydantic validation errors.
    """
    return JSONResponse(
        status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
        content={
            "success": False,
            "error": {
                "code": 422,
                "message": "Validation Error",
                "details": exc.errors(),
                "type": "ValidationError"
            },
            "data": None
        },
    )

async def general_exception_handler(request: Request, exc: Exception):
    """
    Catch-all handler for unhandled exceptions.
    """
    logger.exception(f"Unhandled exception occurred: {str(exc)}")
    return JSONResponse(
        status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
        content={
            "success": False,
            "error": {
                "code": 500,
                "message": "An unexpected internal server error occurred.",
                "type": "InternalServerError"
            },
            "data": None
        },
    )

def setup_handlers(app):
    app.add_exception_handler(StarletteHTTPException, http_exception_handler)
    app.add_exception_handler(RequestValidationError, validation_exception_handler)
    app.add_exception_handler(Exception, general_exception_handler)

    @app.middleware("http")
    async def response_wrapper(request: Request, call_next):
        response = await call_next(request)
        
        # Only wrap JSON responses and skip internal/health routes
        if (
            response.status_code < 400 and 
            "application/json" in response.headers.get("content-type", "") and
            not any(path in request.url.path for path in ["/docs", "/openapi.json", "/health", "/redoc"])
        ):
            import json
            # Read the response body
            body = b""
            async for chunk in response.body_iterator:
                body += chunk
            
            try:
                data = json.loads(body)
                # Wrap the data
                new_content = json.dumps({
                    "success": True,
                    "data": data,
                    "error": None
                }).encode("utf-8")
                
                from fastapi.responses import Response
                headers = dict(response.headers)
                headers.pop("content-length", None)  # Remove old content-length
                
                return Response(
                    content=new_content,
                    status_code=response.status_code,
                    headers=headers,
                    media_type="application/json"
                )
            except Exception:
                # If it's not valid JSON or something goes wrong, return original
                from fastapi.responses import Response
                headers = dict(response.headers)
                headers.pop("content-length", None)
                return Response(
                    content=body,
                    status_code=response.status_code,
                    headers=headers,
                    media_type=response.media_type
                )
        
        return response
