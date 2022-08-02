use near_sdk::{json_types::U128, near_bindgen, setup_alloc, AccountId, Promise};

setup_alloc!();

#[near_bindgen]
pub struct Contract {}

#[near_bindgen]
impl Contract {
    pub fn send_tips(amount: U128, sender: AccountId, receiver: AccountId) -> Promise {
        assert_ne!(sender.to_string(), receiver.to_string(), "You cannot send NEAR to yourself");
        Promise::new(receiver).transfer(amount.0)
    }   
}
