# 🧠 Riddle DApp Monorepo

![Demo GIF](./demo.gif)

Welcome to the Riddle DApp Monorepo! This project is a full-stack decentralized application where users solve on-chain riddles, with answers submitted through a Web3-enabled frontend and verified by a smart contract. The application leverages:

- A **React + Vite** frontend for user interaction.
- A **NestJS** bot service for riddle updates.
- A **Hardhat** project for deploying and verifying smart contracts.

---

## 🌍 Live Deployments

### Frontend URLs
| Environment | URL |
|-------------|-----|
| Development | [https://d111nbdhcwesn9.cloudfront.net/](https://d111nbdhcwesn9.cloudfront.net/) |
| Production  | [https://d3sg6ibaloxnvv.cloudfront.net/](https://d3sg6ibaloxnvv.cloudfront.net/) |

### 📄 Deployed Contracts on Sepolia

| Environment | Contract Address | Etherscan Link |
|-------------|------------------|----------------|
| Development | `0xC50FAdde64a3c08a6705182be1215a99CA2e34B5` | [View on Etherscan](https://sepolia.etherscan.io/address/0xC50FAdde64a3c08a6705182be1215a99CA2e34B5) |
| Production  | `0x6aF71B900544A28cc0c3b277A65458788f6B97E1` | [View on Etherscan](https://sepolia.etherscan.io/address/0x6aF71B900544A28cc0c3b277A65458788f6B97E1) |

---

## 📦 Project Structure

```
monorepo-root/
│
├── dapp-ui/        # React + Vite frontend
├── bot/            # NestJS bot service
├── smart-contract/ # Hardhat smart contracts
└── demo.gif        # Demo animation
```

---

## ⚙️ Infrastructure

- **AWS Copilot** is used for deployment of both frontend and backend services.
- Two environments are configured: `dev` and `prod`.
- GitHub Actions CI/CD pipelines integration is activated on the repo.

