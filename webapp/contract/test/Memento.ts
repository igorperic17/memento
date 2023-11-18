import { ethers } from 'hardhat'
import { expect } from 'chai'
import { loadFixture } from '@nomicfoundation/hardhat-toolbox/network-helpers'

describe('Memento', function () {
  const deploy = async () => {
    const [owner, otherAccount] = await ethers.getSigners()

    const Memento = await ethers.getContractFactory('Memento')
    const memento = await Memento.deploy()

    return { memento, owner }
  }

  it('Should create memento', async function () {
    const { memento, owner } = await loadFixture(deploy)

    const tx = await memento.create('123', 'cid123', 1, { value: 2 })
    const receipt = await tx.wait()

    expect(receipt?.logs.length).to.equal(1)
    const box = await memento.getMemento('123')

    expect(box.sender).to.equal(owner.address)
    expect(box.mementoCid).to.equal('cid123')
  })
})
