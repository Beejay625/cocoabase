# Reown Wallet Integration Guide

## Overview

All 20 onchain features require Reown wallet connection via wagmi hooks.

## Usage

```typescript
import { useAccount, useWriteContract } from 'wagmi';

const { address } = useAccount(); // Reown wallet
const { writeContract } = useWriteContract(); // Reown transactions
```

