# Riddle DApp Frontend

This is the React + Vite-based frontend for the Riddle DApp.

## Setup Instructions

### 1. Install Dependencies

```bash
npm ci
```

### 2. Environment Setup

Create a `.env` file based on `.env.template`:

```bash
cp .env.template .env
```

Edit `.env` with your actual credentials:

```dotenv
VITE_REOWN_PROJECT_ID=your-reown-project-id
VITE_SMART_CONTRACT_ADDRESS=your-smart-contract-address
VITE_RPC_URL=blockchain-rpc-url
```

### 3. Development

```bash
npm run dev
```

### 4. Build for Production

```bash
npm run build
```

### 5. Preview Production Build

```bash
npm run preview
```

## Deployment

This project is configured with **AWS Copilot** for CI/CD.

### Environments

- `dev` — Staging environment
- `prod` — Production environment

Each environment is deployed via Copilot.

### Deploy via Copilot

```bash
# Deploy to dev
copilot deploy --name riddle-dapp-ui --env dev

# Deploy to prod
copilot deploy --name riddle-dapp-ui --env prod
```

### TODO

- [ ] Integrate GitHub Actions for CI workflows

