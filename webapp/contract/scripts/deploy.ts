import { ethers } from 'hardhat'

async function main() {
  const cont = await ethers.deployContract('Memento')

  await cont.waitForDeployment()

  console.log(`Deployed to ${cont.target}`)
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
