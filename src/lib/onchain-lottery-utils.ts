import { type Address } from 'viem';

/**
 * Onchain lottery system utilities
 * Raffle and lottery functionality
 */

export interface Lottery {
  id: bigint;
  name: string;
  ticketPrice: bigint;
  prizePool: bigint;
  startTime: bigint;
  endTime: bigint;
  drawn: boolean;
  winner: Address | null;
}

export interface LotteryTicket {
  id: bigint;
  lotteryId: bigint;
  buyer: Address;
  number: bigint;
  purchasedAt: bigint;
}

export function createLottery(
  name: string,
  ticketPrice: bigint,
  startTime: bigint,
  endTime: bigint
): Lottery {
  return {
    id: BigInt(0),
    name,
    ticketPrice,
    prizePool: BigInt(0),
    startTime,
    endTime,
    drawn: false,
    winner: null,
  };
}

export function purchaseTicket(
  lottery: Lottery,
  buyer: Address,
  ticketNumber: bigint
): { lottery: Lottery; ticket: LotteryTicket } {
  const ticket: LotteryTicket = {
    id: BigInt(0),
    lotteryId: lottery.id,
    buyer,
    number: ticketNumber,
    purchasedAt: BigInt(Date.now()),
  };
  return {
    lottery: {
      ...lottery,
      prizePool: lottery.prizePool + lottery.ticketPrice,
    },
    ticket,
  };
}

export function drawLotteryWinner(
  lottery: Lottery,
  tickets: LotteryTicket[],
  winningNumber: bigint
): { lottery: Lottery; winner: Address | null } {
  const winningTicket = tickets.find(t => t.number === winningNumber);
  return {
    lottery: {
      ...lottery,
      drawn: true,
      winner: winningTicket?.buyer || null,
    },
    winner: winningTicket?.buyer || null,
  };
}

export function isLotteryActive(
  lottery: Lottery,
  currentTime: bigint
): boolean {
  return (
    currentTime >= lottery.startTime &&
    currentTime <= lottery.endTime &&
    !lottery.drawn
  );
}

export function calculateTicketOdds(
  totalTickets: number,
  ticketsOwned: number
): number {
  if (totalTickets === 0) return 0;
  return (ticketsOwned / totalTickets) * 100;
}

export function generateRandomTicketNumber(
  min: bigint,
  max: bigint
): bigint {
  const range = max - min + BigInt(1);
  return min + (BigInt(Math.floor(Math.random() * Number(range))) % range);
}

export function calculateLotteryOdds(
  totalTickets: number,
  userTickets: number
): number {
  if (totalTickets === 0) return 0;
  return (userTickets / totalTickets) * 100;
}
