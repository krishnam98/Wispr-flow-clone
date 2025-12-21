#[tauri::command]
pub fn get_deepgram_key() -> String {
    std::env::var("DEEPGRAM_API_KEY")
        .expect("DEEPGRAM_API_KEY must be set in .env file")
}
