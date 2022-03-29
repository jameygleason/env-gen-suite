# Generate ENV

[WIP]

## .gitignore

If you don't want to commit your secrets git, add the following to your `.gitignore`

```txt
# dotenv environment variables files
.env
.env*
!.env.sample
```

This say, "don't commit `.env` or `.env` followed by any other text, but do commit `.env.sample`"
