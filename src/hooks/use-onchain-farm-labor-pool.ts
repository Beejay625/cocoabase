import { useState } from 'react';
import { useAccount, useWriteContract } from 'wagmi';
import type { Address } from 'viem';
import {
  createWorker as createWorkerData,
  createJob as createJobData,
  type Worker,
  type Job,
} from '@/lib/onchain-farm-labor-pool-utils';

/**
 * Hook for onchain farm labor pool
 * Uses Reown wallet for all transactions
 */
export function useOnchainFarmLaborPool() {
  const { address } = useAccount();
  const { writeContract } = useWriteContract();
  const [workers, setWorkers] = useState<Worker[]>([]);
  const [jobs, setJobs] = useState<Job[]>([]);

  const registerWorker = async (
    contractAddress: Address,
    name: string,
    skills: string,
    hourlyRate: bigint
  ): Promise<void> => {
    if (!address) throw new Error('Wallet not connected via Reown');
    
    const worker = createWorkerData(address, name, skills, hourlyRate);
    
    await writeContract({
      address: contractAddress,
      abi: [
        {
          inputs: [
            { name: 'name', type: 'string' },
            { name: 'skills', type: 'string' },
            { name: 'hourlyRate', type: 'uint256' }
          ],
          name: 'registerWorker',
          outputs: [],
          stateMutability: 'nonpayable',
          type: 'function'
        }
      ],
      functionName: 'registerWorker',
      args: [name, skills, hourlyRate],
    });
    
    setWorkers([...workers, worker]);
  };

  const createJob = async (
    contractAddress: Address,
    jobDescription: string,
    startDate: bigint,
    endDate: bigint,
    hourlyRate: bigint,
    totalHours: bigint
  ): Promise<void> => {
    if (!address) throw new Error('Wallet not connected via Reown');
    
    const job = createJobData(address, jobDescription, startDate, endDate, hourlyRate, totalHours);
    
    await writeContract({
      address: contractAddress,
      abi: [
        {
          inputs: [
            { name: 'jobDescription', type: 'string' },
            { name: 'startDate', type: 'uint256' },
            { name: 'endDate', type: 'uint256' },
            { name: 'hourlyRate', type: 'uint256' },
            { name: 'totalHours', type: 'uint256' }
          ],
          name: 'createJob',
          outputs: [{ name: '', type: 'uint256' }],
          stateMutability: 'nonpayable',
          type: 'function'
        }
      ],
      functionName: 'createJob',
      args: [jobDescription, startDate, endDate, hourlyRate, totalHours],
    });
    
    setJobs([...jobs, job]);
  };

  const assignJob = async (
    contractAddress: Address,
    jobId: bigint,
    worker: Address
  ): Promise<void> => {
    if (!address) throw new Error('Wallet not connected via Reown');
    
    await writeContract({
      address: contractAddress,
      abi: [
        {
          inputs: [
            { name: 'jobId', type: 'uint256' },
            { name: 'worker', type: 'address' }
          ],
          name: 'assignJob',
          outputs: [],
          stateMutability: 'nonpayable',
          type: 'function'
        }
      ],
      functionName: 'assignJob',
      args: [jobId, worker],
    });
  };

  const completeJob = async (
    contractAddress: Address,
    jobId: bigint
  ): Promise<void> => {
    if (!address) throw new Error('Wallet not connected via Reown');
    
    await writeContract({
      address: contractAddress,
      abi: [
        {
          inputs: [{ name: 'jobId', type: 'uint256' }],
          name: 'completeJob',
          outputs: [],
          stateMutability: 'nonpayable',
          type: 'function'
        }
      ],
      functionName: 'completeJob',
      args: [jobId],
    });
  };

  return { 
    workers,
    jobs,
    registerWorker, 
    createJob,
    assignJob,
    completeJob,
    address 
  };
}

