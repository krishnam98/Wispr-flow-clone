use tauri::Emitter;

mod commands;

pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_clipboard_manager::init())
        .setup(|app| {
            #[cfg(desktop)]
            {
                use tauri_plugin_global_shortcut::{
                    Code, GlobalShortcutExt, Modifiers, Shortcut, ShortcutState,
                };

                // Ctrl + Shift + Space push-to-talk shortcut
                let ptt_shortcut = Shortcut::new(
                    Some(Modifiers::CONTROL | Modifiers::SHIFT),
                    Code::Space, // dummy key, modifiers matter
                );

                app.handle().plugin(
                    tauri_plugin_global_shortcut::Builder::new()
                        .with_handler(move |app, shortcut, event| {
                            if shortcut == &ptt_shortcut {
                                match event.state() {
                                    ShortcutState::Pressed => {
                                        app.emit("ptt-start", ()).unwrap();
                                    }
                                    ShortcutState::Released => {
                                        app.emit("ptt-stop", ()).unwrap();
                                    }
                                }
                            }
                        })
                        .build(),
                )?;

                app.global_shortcut().register(ptt_shortcut)?;
            }

            Ok(())
        })
        .invoke_handler(tauri::generate_handler![commands::get_deepgram_key,
                                                 commands::paste_text])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
