import * as anchor from "@project-serum/anchor";
import { Program } from "@project-serum/anchor";
import { Project2 } from "../target/types/project2";
import { expect } from 'chai';

const { SystemProgram } = anchor.web3;

describe("project2", () => {
  // Configure the client to use the local cluster.
  anchor.setProvider(anchor.AnchorProvider.env());

  const program = anchor.workspace.Project2 as Program<Project2>;
  const programProvider = program.provider as anchor.AnchorProvider;

  // Need the test to generate its own keypair
  const keypair = anchor.web3.Keypair.generate();
  
  const text = "Hola Mundo";

  it("Create an instance of the program and fetch the text sent during creation", async () => {
    // Add your test here.
    const tx = await program.methods.create(text).accounts({
      calculator: keypair.publicKey,
      user: programProvider.wallet.publicKey,
      systemProgram: SystemProgram.programId
    }).signers([keypair]).rpc();

    console.log("Your transaction signature", tx);

    const account = await program.account.calculator.fetch(keypair.publicKey);

    expect(account.greeting).to.eql(text);
  });

  it("Sum two values using the Calculate Context within the Calculator Account", async () => {
    const tx = await program.methods.sum(new anchor.BN(6), new anchor.BN(9))
      .accounts({
        calculator: keypair.publicKey
      }).rpc()

      console.log("Your transaction signature", tx);

      const account = await program.account.calculator.fetch(keypair.publicKey);
      expect(account.result).to.not.eql(new anchor.BN(69));
      expect(account.result).to.eql(new anchor.BN(15));
    })
 
  it("Substract two values using the Calculate Context within the Calculator Account", async () => {
    const tx = await program.methods.subtract(new anchor.BN(6), new anchor.BN(9))
      .accounts({
        calculator: keypair.publicKey
      }).rpc()

      console.log("Your transaction signature", tx);

      const account = await program.account.calculator.fetch(keypair.publicKey);
      expect(account.result).to.not.eql(new anchor.BN(69));
      expect(account.result).to.eql(new anchor.BN(-3));
    })
 
  it("Multiply two values using the Calculate Context within the Calculator Account", async () => {
    const tx = await program.methods.multiply(new anchor.BN(6), new anchor.BN(9))
      .accounts({
        calculator: keypair.publicKey
      }).rpc()

      console.log("Your transaction signature", tx);

      const account = await program.account.calculator.fetch(keypair.publicKey);
      expect(account.result).to.not.eql(new anchor.BN(69));
      expect(account.result).to.eql(new anchor.BN(54));
    })
 
  it("Divide two values using the Calculate Context within the Calculator Account", async () => {
    const tx = await program.methods.divide(new anchor.BN(12), new anchor.BN(6))
      .accounts({
        calculator: keypair.publicKey
      }).rpc()

      console.log("Your transaction signature", tx);

      const account = await program.account.calculator.fetch(keypair.publicKey);
      expect(account.result).to.eql(new anchor.BN(2));
    })
 
});
