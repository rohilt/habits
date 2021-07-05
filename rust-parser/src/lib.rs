mod utils;

use wasm_bindgen::prelude::*;
use chrono::NaiveDate;

// When the `wee_alloc` feature is enabled, use `wee_alloc` as the global
// allocator.
#[cfg(feature = "wee_alloc")]
#[global_allocator]
static ALLOC: wee_alloc::WeeAlloc = wee_alloc::WeeAlloc::INIT;

// #[wasm_bindgen]
// extern {
//     fn alert(s: &str);
// }

// #[wasm_bindgen]
// pub fn greet() {
//     alert("Hello, rust-parser!");
// }
#[wasm_bindgen]
pub struct Journal {
    entries: Vec<Entry>,
}

#[wasm_bindgen]
pub struct Entry {
    date: NaiveDate,
    activity: String,
    minutes: u32,
}

#[wasm_bindgen]
impl Entry {
    pub fn new() -> Entry {
        Entry { date: NaiveDate::from_ymd(2021,01,01), activity: "asdf".to_string(), minutes: 15 }
    }
    pub fn getMinutes(&self) -> u32 {
        self.minutes
    }
}
