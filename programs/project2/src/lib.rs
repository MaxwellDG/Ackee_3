use anchor_lang::prelude::*;
use anchor_lang::solana_program::entrypoint::ProgramResult;

// This value must be updated aftear a successful "anchor build" then "anchor deploy"
// It must also be changed in Anchor.toml "<projectName>="
declare_id!("7gugESb2Dy7AwDSTMnipaxLB3W1smBhztGWCohGrMWUK");

#[program]
pub mod project2 {
    use super::*;

    pub fn create(ctx: Context<Create>, init_message: String) -> ProgramResult{
        let calculator = &mut ctx.accounts.calculator;
        calculator.greeting = init_message;
        Ok({})
    }

    pub fn sum(ctx: Context<Calculate>, num1: i64, num2: i64) -> ProgramResult {
        let calculator = &mut ctx.accounts.calculator;
        calculator.result = num1 + num2;
        Ok(())
    }

    pub fn subtract(ctx: Context<Calculate>, num1: i64, num2: i64) -> ProgramResult {
        let calculator = &mut ctx.accounts.calculator;
        calculator.result = num1 - num2;
        Ok(())
    }

    pub fn multiply(ctx: Context<Calculate>, num1: i64, num2: i64) -> ProgramResult {
        let calculator = &mut ctx.accounts.calculator;
        calculator.result = num1 * num2;
        Ok(())
    }

    pub fn divide(ctx: Context<Calculate>, num1: i64, num2: i64) -> ProgramResult {
        let calculator = &mut ctx.accounts.calculator;
        calculator.result = num1 / num2;
        Ok(())
    }


}

#[account]
pub struct Calculator{
    greeting: String,
    result: i64
}

#[derive(Accounts)]
pub struct Create<'info>{

    #[account(init, payer=user, space=264)]
        pub calculator: Account<'info, Calculator>,

    #[account(mut)]
        pub user: Signer<'info>,
        pub system_program: Program<'info, System>
}

#[derive(Accounts)]
pub struct Calculate<'info>{
    #[account(mut)]
    pub calculator: Account<'info, Calculator>
}

