import { expect } from 'chai';
import { loadFixture } from '@nomicfoundation/hardhat-network-helpers';
import { ethers } from 'hardhat';
import { keccak256, toUtf8Bytes, ZeroAddress } from 'ethers';

describe('OnchainRiddle', function () {
  async function deployRiddleFixture() {
    const [bot, player1, player2] = await ethers.getSigners();
    const Riddle = await ethers.getContractFactory('OnchainRiddle');
    const riddle = await Riddle.connect(bot).deploy();
    return { riddle, bot, player1, player2 };
  }

  it('should set bot correctly on deployment', async function () {
    const { riddle, bot } = await loadFixture(deployRiddleFixture);
    expect(await riddle.bot()).to.equal(bot.address);
  });

  it('should allow only the bot to set a riddle', async function () {
    const { riddle, bot, player1 } = await loadFixture(deployRiddleFixture);
    const riddleText = 'What has keys but can’t open locks?';
    const answer = 'keyboard';
    const hash = keccak256(toUtf8Bytes(answer));

    await expect(
      riddle.connect(player1).setRiddle(riddleText, hash)
    ).to.be.revertedWith('Only bot can call this function');

    await expect(riddle.connect(bot).setRiddle(riddleText, hash))
      .to.emit(riddle, 'RiddleSet')
      .withArgs(riddleText);
  });

  it('should not allow setting a new riddle when one is active', async function () {
    const { riddle, bot } = await loadFixture(deployRiddleFixture);
    const hash = keccak256(toUtf8Bytes('answer'));

    await riddle.connect(bot).setRiddle('First?', hash);

    await expect(
      riddle.connect(bot).setRiddle('Second?', hash)
    ).to.be.revertedWith('Riddle already active');
  });

  it('should emit Winner when the correct answer is submitted', async function () {
    const { riddle, bot, player1 } = await loadFixture(deployRiddleFixture);
    const answer = 'sun';
    const hash = keccak256(toUtf8Bytes(answer));
    await riddle.connect(bot).setRiddle('I rise in the morning', hash);

    await expect(riddle.connect(player1).submitAnswer('sun'))
      .to.emit(riddle, 'Winner')
      .withArgs(player1.address);

    expect(await riddle.winner()).to.equal(player1.address);
    expect(await riddle.isActive()).to.equal(false);
  });

  it('should emit AnswerAttempt with false on wrong answer', async function () {
    const { riddle, bot, player1 } = await loadFixture(deployRiddleFixture);
    const hash = keccak256(toUtf8Bytes('answer'));
    await riddle.connect(bot).setRiddle('A riddle?', hash);

    await expect(riddle.connect(player1).submitAnswer('wrong'))
      .to.emit(riddle, 'AnswerAttempt')
      .withArgs(player1.address, false);

    expect(await riddle.winner()).to.equal(ZeroAddress);
    expect(await riddle.isActive()).to.equal(true);
  });

  it('should not allow submission if riddle is not active', async function () {
    const { riddle, player1 } = await loadFixture(deployRiddleFixture);
    await expect(
      riddle.connect(player1).submitAnswer('anything')
    ).to.be.revertedWith('No active riddle');
  });

  it('should not allow submission if already solved', async function () {
    const { riddle, bot, player1 } = await loadFixture(deployRiddleFixture);
    const answer = 'tree';
    const hash = keccak256(toUtf8Bytes(answer));
    await riddle
      .connect(bot)
      .setRiddle('What has leaves but isn’t a book?', hash);

    await riddle.connect(player1).submitAnswer('tree');

    await expect(
      riddle.connect(player1).submitAnswer('tree')
    ).to.be.revertedWith('No active riddle');
  });
});
