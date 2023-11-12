resource acr 'Microsoft.ContainerRegistry/registries@2020-11-01-preview' = {
  name: 'slipbox-test-project'
  location: 'westeurope'
  sku: {
    name: 'Basic'
    tier: 'Basic'
  }
}

