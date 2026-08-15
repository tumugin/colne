import type { CodegenConfig } from '@graphql-codegen/cli'

const config: CodegenConfig = {
  overwrite: true,
  schema: 'graphql/schemas/aisu-schema.graphql',
  documents: 'graphql/*.graphql',
  generates: {
    'graphql/generated/client.ts': {
      plugins: ['typescript-operations', 'typescript-graphql-request'],
      config: {
        enumType: 'native',
        withHooks: true,
      },
    },
  },
}

export default config
