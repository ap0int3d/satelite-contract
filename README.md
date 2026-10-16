# @satelite/contract

Types and schemas of the [SATeLite](https://github.com/ap0int3d/satelite) module integration contract. No logic — see `docs/module-integration-contract.md` in the main repository for what this contract means and who must follow it.

This repository mirrors `packages/contract` from the main `satelite` monorepo, which remains the source of truth during active development. Consume it from another repository as a git dependency:

```json
{
  "dependencies": {
    "@satelite/contract": "github:ap0int3d/satelite-contract#<tag-or-commit>"
  }
}
```

## Build

```
npm install
npm run build
```

## License

Apache 2.0 — see [LICENSE](LICENSE).
