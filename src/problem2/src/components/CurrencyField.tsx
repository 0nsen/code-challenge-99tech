import { Box, Stack, TextField, Typography } from "@mui/material";
import { useCurrencies } from "../hooks/useCurrencies";
import { CurrencySelect } from "./CurrencySelect";
import { formatNumber } from "../utils/format";

interface Props {
  label: string;
  amount: string;
  onAmountChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  selected: string;
  onCurrencyChange: (c: string) => void;
  autoFocus?: boolean;
}

export default function CurrencyField(props: Props) {
  const { data: currencyMap } = useCurrencies();
  const {
    label,
    amount,
    onAmountChange,
    selected,
    onCurrencyChange,
    autoFocus,
  } = props;

  const usdValue =
    currencyMap && amount && !isNaN(parseFloat(amount))
      ? (() => {
          const price = currencyMap.get(selected);
          if (!price) return null;
          const usd = parseFloat(amount) * price;
          return `≈ ${formatNumber(usd, { style: "currency", currency: "USD", minimumFractionDigits: 2, maximumFractionDigits: 6 })}`;
        })()
      : null;

  return (
    <Stack
      direction="row"
      spacing={1}
      sx={{
        alignItems: "center",
        justifyContent: "space-between",
        background: "#f9f8ff",
        border: "1px solid #ede8ff",
        borderRadius: "16px",
        p: 2,
        transition: "border-color 0.2s",
        "&:focus-within": {
          borderColor: "#7c4dff",
          background: "#f5f0ff",
        },
      }}
    >
      <Stack spacing={0.25}>
        <Typography
          component="span"
          sx={{
            display: "block",
            color: "text.disabled",
            fontSize: "0.7rem",
            fontWeight: 600,
            textTransform: "uppercase",
            mb: 0.25,
          }}
        >
          {label}
        </Typography>

        <TextField
          value={amount}
          onChange={onAmountChange}
          placeholder="0"
          variant="standard"
          autoFocus={autoFocus}
          slotProps={{
            input: {
              inputMode: "decimal",
              style: {
                fontSize: "1.6rem",
                fontWeight: 700,
                color: "#1a1a2e",
              },
            },
          }}
          sx={{
            "& .MuiInput-root": {
              fontSize: "1.6rem",
              fontWeight: 700,
              "&:before": { display: "none" },
              "&:after": { display: "none" },
            },
          }}
        />

        {usdValue && (
          <Typography
            component="span"
            sx={{
              color: "text.disabled",
              fontSize: "0.72rem",
              display: "block",
            }}
          >
            {usdValue}
          </Typography>
        )}
      </Stack>

      <Box sx={{ flexShrink: 0 }}>
        {currencyMap ? (
          <CurrencySelect selected={selected} onChange={onCurrencyChange} />
        ) : null}
      </Box>
    </Stack>
  );
}
