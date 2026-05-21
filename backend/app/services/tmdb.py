import httpx
from typing import List, Dict, Any, Optional
from app.core.config import settings

# TMDB Genre ID to Name Mapping
GENRES_MAP = {
    28: "Action", 12: "Adventure", 16: "Animation", 35: "Comedy", 80: "Crime",
    99: "Documentary", 18: "Drama", 10751: "Family", 14: "Fantasy", 36: "History",
    27: "Horror", 10402: "Music", 9648: "Mystery", 10749: "Romance", 878: "Sci-Fi",
    10770: "TV Movie", 53: "Thriller", 10752: "War", 37: "Western",
    10759: "Action & Adventure", 10762: "Kids", 10763: "News", 10764: "Reality",
    10765: "Sci-Fi & Fantasy", 10766: "Soap", 10767: "Talk", 10768: "War & Politics"
}

class TMDBService:
    BASE_URL = "https://api.themoviedb.org/3"
    
    def __init__(self):
        self.api_key = settings.THE_MOVIE_DB_API_KEY
        self.access_token = settings.THE_MOVIE_DB_ACCESS_TOKEN
        
    @property
    def headers(self) -> Dict[str, str]:
        headers = {
            "accept": "application/json"
        }
        if self.access_token:
            headers["Authorization"] = f"Bearer {self.access_token}"
        return headers

    @property
    def default_params(self) -> Dict[str, str]:
        params = {}
        if not self.access_token and self.api_key:
            params["api_key"] = self.api_key
        return params

    async def search_multi(self, query: str, page: int = 1) -> List[Dict[str, Any]]:
        """
        Search movies and TV shows from TMDB using the search/multi endpoint.
        """
        if not query:
            return []
            
        params = {
            **self.default_params,
            "query": query,
            "page": str(page),
            "include_adult": "false",
            "language": "en-US"
        }
        
        async with httpx.AsyncClient() as client:
            try:
                response = await client.get(
                    f"{self.BASE_URL}/search/multi",
                    headers=self.headers,
                    params=params,
                    timeout=10.0
                )
                response.raise_for_status()
                data = response.json()
                results = data.get("results", [])
                
                # Format the results to a simplified format for UI consumption
                formatted_results = []
                for item in results:
                    media_type = item.get("media_type")
                    if media_type not in ("movie", "tv"):
                        continue
                        
                    # Map genre IDs to names
                    genre_ids = item.get("genre_ids", [])
                    genres = [GENRES_MAP.get(gid) for gid in genre_ids if gid in GENRES_MAP]
                    
                    poster_path = item.get("poster_path")
                    cover_image = f"https://image.tmdb.org/t/p/w500{poster_path}" if poster_path else None
                    
                    formatted_results.append({
                        "tmdb_id": item.get("id"),
                        "title": item.get("title") if media_type == "movie" else item.get("name"),
                        # Map tv show to 'tv_show' or check if it is animation/anime
                        "type": "movie" if media_type == "movie" else "tv_show", 
                        "rating": round(item.get("vote_average", 0.0), 1),
                        "cover_image": cover_image,
                        "genres": genres,
                        "release_date": item.get("release_date") if media_type == "movie" else item.get("first_air_date")
                    })
                return formatted_results
            except Exception as e:
                print(f"TMDB search failed: {e}")
                return []

    async def get_tv_details(self, tv_id: int) -> Optional[Dict[str, Any]]:
        """
        Get details for a TV show to find number of episodes, genres, etc.
        """
        params = {
            **self.default_params,
            "language": "en-US"
        }
        
        async with httpx.AsyncClient() as client:
            try:
                response = await client.get(
                    f"{self.BASE_URL}/tv/{tv_id}",
                    headers=self.headers,
                    params=params,
                    timeout=10.0
                )
                response.raise_for_status()
                return response.json()
            except Exception as e:
                print(f"TMDB TV details fetch failed: {e}")
                return None

    async def get_movie_details(self, movie_id: int) -> Optional[Dict[str, Any]]:
        """
        Get details for a movie.
        """
        params = {
            **self.default_params,
            "language": "en-US"
        }
        
        async with httpx.AsyncClient() as client:
            try:
                response = await client.get(
                    f"{self.BASE_URL}/movie/{movie_id}",
                    headers=self.headers,
                    params=params,
                    timeout=10.0
                )
                response.raise_for_status()
                return response.json()
            except Exception as e:
                print(f"TMDB movie details fetch failed: {e}")
                return None

tmdb_service = TMDBService()
