use tauri::{AppHandle};
use tauri_plugin_clipboard_manager::ClipboardExt;

#[tauri::command]
pub fn get_deepgram_key() -> String {
    std::env::var("DEEPGRAM_API_KEY")
        .expect("DEEPGRAM_API_KEY must be set in .env file")
}

#[tauri::command]
pub fn paste_text(app:AppHandle, text:String) -> Result<(),String>{
    println!("paste command called with text: {}",text);

    app.clipboard()
        .write_text(text)
        .map_err(|e| e.to_string())?;
    
    println!("TEXT WRITTEN TO CLIPBOARD");    

    #[cfg(target_os="windows")]
    {
        use enigo::{Enigo,KeyboardControllable,Key};
        let mut enigo= Enigo::new();
        enigo.key_down(Key::Control);
        enigo.key_click(Key::Layout('v'));
        enigo.key_up(Key::Control);
    }    

    #[cfg(target_os="macos")]
    {
        use enigo::{Enigo,KeyboardControllable,Key};
        let mut enigo= Enigo::new();
        enigo.key_down(Key::Meta);
        enigo.key_click(Key::Layout('v'));
        enigo.key_up(Key::Meta);
    }

    Ok(())
}
