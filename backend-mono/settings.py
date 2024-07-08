from pydantic import BaseSettings, Field

class Settings(BaseSettings):
    PROJECT_NAME: str = "eSports Competition Platform"
    VERSION: str = "1.0.0"
    API_V1_STR: str = "/api/v1"
    DATABASE_URL: str = Field(..., env='DATABASE_URL')
    SECRET_KEY: str = Field(..., env='SECRET_KEY')
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60  # 60 minutes, adjust as needed
    ALGORITHM: str = "HS256"
    ADMIN_EMAIL: str = Field(..., env='ADMIN_EMAIL')

    class Config:
        # The path to a .env file can be specified here to automatically load environment variables
        env_file = ".env"
        env_file_encoding = 'utf-8'

settings = Settings()
