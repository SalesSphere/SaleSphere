# Load environment variables from .env
include .env
export $(shell sed 's/=.*//' .env)

# Formatting and Testing prerequisite
.PHONY: check
check:
	forge fmt
	forge build --sizes
	forge coverage --gas-report

# Deployment targets
DeploySaleSphereLocal: check
	forge script script/SaleSphere.s.sol --rpc-url localhost --broadcast

DeploySaleSphere: check
	forge script script/SaleSphere.s.sol --rpc-url lisk-sepolia --broadcast --verify

