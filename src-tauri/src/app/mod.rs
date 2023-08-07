mod utility;

use crate::app::utility::generate_menu;
use crate::commands::{__cmd__save_todos, save_todos};

pub struct App;

impl App {
    pub fn run() {
        tauri::Builder::default()
            .menu(generate_menu())
            .on_menu_event(|event| match event.menu_item_id() {
                "quit" => std::process::exit(0),
                "save" => {
                    println!("Hello, World save");
                }
                "load" => {
                    println!("Hello, World load");
                }
                _ => {}
            })
            .invoke_handler(tauri::generate_handler![save_todos])
            .run(tauri::generate_context!())
            .expect("error while running tauri application");
    }
}
