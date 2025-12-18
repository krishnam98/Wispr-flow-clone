// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

#[tauri::command]
fn get_deepgram_key() -> String {
  std::env::var("DEEPGRAM_API_KEY").unwrap()
}

fn main() {
  tauri::Builder::default()
    .invoke_handler(tauri::generate_handler![get_deepgram_key])
    .run(tauri::generate_context!())
    .expect(" error while running tauri application");
}
