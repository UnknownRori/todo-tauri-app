// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use tauri::{CustomMenuItem, Menu, Submenu};

// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

fn generate_menu() -> Menu {
    // here `"quit".to_string()` defines the menu item id, and the second parameter is the menu item label.
    let quit = CustomMenuItem::new("quit".to_string(), "Quit");
    let save = CustomMenuItem::new("save".to_string(), "Save");
    let load = CustomMenuItem::new("load".to_string(), "Load");
    let submenu = Submenu::new(
        "File",
        Menu::new().add_item(save).add_item(load).add_item(quit),
    );
    Menu::new().add_submenu(submenu)
}

fn main() {
    tauri::Builder::default()
        .menu(generate_menu())
        .on_menu_event(|event| match event.menu_item_id() {
            "quit" => std::process::exit(0),
            _ => {}
        })
        .invoke_handler(tauri::generate_handler![greet])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
