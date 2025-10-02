/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_APPWRITE_ENDPOINT: string
    readonly VITE_APPWRITE_PROJECT_ID: string
    readonly VITE_APPWRITE_PROJECT_NAME: string
    
    readonly VITE_API_URL: string
    readonly VITE_APP_NAME: string
    readonly VITE_DEBUG: string

    readonly VITE_APPWRITE_DATABASE_ID: string
    readonly VITE_APPWRITE_PROJECTS_COLLECTION_ID: string
    readonly VITE_APPWRITE_SKILLS_COLLECTION_ID: string
    readonly VITE_APPWRITE_EXPERIENCE_COLLECTION_ID: string
    // Add more environment variables as needed
}

interface ImportMeta {
    readonly env: ImportMetaEnv
}
