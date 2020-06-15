const { assert } = require('chai');

const Image = artifacts.require("Image");
require('chai')
    .use(require('chai-as-promised'))
    .should()

contract('Image', (accounts) => {
    let image

    before(async () => {
        image = await Image.deployed()
    })
    describe('deployment', async () => {
        it('deploys successfully', async () => {
            image = await Image.deployed()
            const address = image.address
            assert.notEqual(address, 0x0)
            assert.notEqual(address, '')
            assert.notEqual(address, null)
            assert.notEqual(address, undefined)
        })
    })
    describe('storage', async () => {
        it('updtes the ipfsHash', async () => {
            let ipfsHash
            ipfsHash = 'abc123'
            await image.set(ipfsHash)
            const result = await image.get()
            assert.equal(result, ipfsHash)
        })
    })
})