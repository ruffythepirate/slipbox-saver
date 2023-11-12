#!/bin/zsh

# Define your Azure resource group and container registry details
resourceGroupName="slipbox-test-project"
location="westeurope"
acrName="slipboxtestprojectacr"

if ! az account show &>/dev/null; then
    echo "Not logged in. Logging in..."
    az login
else
    echo "Already logged in."
fi

# Check if the resource group exists
if az group show --name $resourceGroupName &>/dev/null; then
    echo "Resource group '$resourceGroupName' already exists."

    # Delete the existing resource group and its content
    echo "Deleting resource group '$resourceGroupName'..."
    az group delete --name $resourceGroupName --yes --no-wait

    # Wait for the resource group to be deleted
    echo "Waiting for resource group deletion..."
    az group wait --name $resourceGroupName --deleted

    # Recreate the resource group
    echo "Creating resource group '$resourceGroupName'..."
    az group create --name $resourceGroupName --location $location
else
    echo "Resource group '$resourceGroupName' does not exist. Creating it..."
    az group create --name $resourceGroupName --location $location
fi

# Your additional resource provisioning logic here

# Create an Azure Container Registry in the resource group
echo "Creating Azure Container Registry '$acrName'..."
az acr create --resource-group $resourceGroupName --name $acrName --sku Basic


# Create a resource group.
az deployment group create --resource-group slipbox-test-resource --template-file acr.bicep

