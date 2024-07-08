class Settings(BaseSettings):
    DATABASE_URL: str = "postgresql://youruser:yourpassword@localhost/yourdbname"
    PROJECT_NAME: str = "eSports Competition Platform"