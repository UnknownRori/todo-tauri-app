use crate::model::Todo;

#[tauri::command(rename_all = "snake_case")]
pub fn save_todos(todos: Vec<Todo>) {
    println!("{:#?}", todos);
}
