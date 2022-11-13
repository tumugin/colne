import type { CodegenConfig } from '@graphql-codegen/cli'

const config: CodegenConfig = {
  overwrite: true,
  schema: 'graphql/schemas/aisu-schema.graphql',
  documents: 'graphql/*.graphql',
  generates: {
    'graphql/generated/client.ts': {
      plugins: [
        'typescript',
        'typescript-operations',
      ],
      config: {
        withHooks: true,
      },
    },
  },
}

export default config
