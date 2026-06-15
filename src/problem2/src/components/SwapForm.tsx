import React, { useState, useCallback, useEffect } from "react";
import {
  Box,
  IconButton,
  Alert,
  Chip,
  Stack,
  CircularProgress,
} from "@mui/material";
import { SwapVert } from "@mui/icons-material";
import { useCurrencies } from "../hooks/useCurrencies";
import { convert } from "../services/currency";
import { formatNumber } from "../utils/format";
import CurrencyField from "./CurrencyField";

const DEFAULT_FROM = "ETH";
const DEFAULT_TO = "USDC";

export default function SwapForm() {
  const { data: currencies, isSuccess, isError, isPending } = useCurrencies();

  const [fromCurrency, setFromCurrency] = useState(DEFAULT_FROM);
  const [toCurrency, setToCurrency] = useState(DEFAULT_TO);
  const [fromAmount, setFromAmount] = useState("1");
  const [toAmount, setToAmount] = useState("");
  const [lastEdited, setLastEdited] = useState<"from" | "to">("from");

  // Recompute the "other" field when inputs change
  useEffect(() => {
    if (!isSuccess || !currencies) return;

    if (lastEdited === "from") {
      const parsed = parseFloat(fromAmount);
      if (!fromAmount || isNaN(parsed) || parsed < 0) {
        setToAmount("");
        return;
      }
      const result = convert(currencies, fromCurrency, toCurrency, parsed);
      setToAmount(formatNumber(result));
    } else {
      const parsed = parseFloat(toAmount);
      if (!toAmount || isNaN(parsed) || parsed < 0) {
        setFromAmount("");
        return;
      }
      const result = convert(currencies, toCurrency, fromCurrency, parsed);
      setFromAmount(formatNumber(result));
    }
  }, [
    fromAmount,
    toAmount,
    fromCurrency,
    toCurrency,
    currencies,
    isSuccess,
    lastEdited,
  ]);

  const handleFromAmountChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const val = e.target.value;
      setLastEdited("from");
      if (val === "" || /^\d*\.?\d*$/.test(val)) {
        setFromAmount(val);
      }
    },
    [],
  );

  const handleToAmountChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const val = e.target.value;
      setLastEdited("to");
      if (val === "" || /^\d*\.?\d*$/.test(val)) {
        setToAmount(val);
      }
    },
    [],
  );

  const handleFromCurrencyChange = (currency: string) => {
    setFromCurrency(currency);
    setLastEdited("from");
  };

  const handleToCurrencyChange = (currency: string) => {
    setToCurrency(currency);
    setLastEdited("to");
  };

  const handleSwapCurrencies = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
    setFromAmount(toAmount || "");
    setToAmount(fromAmount || "");
    setLastEdited("from");
  };

  const shouldShowRate =
    isSuccess && currencies && fromCurrency !== toCurrency
      ? (() => {
          const rate = convert(currencies, fromCurrency, toCurrency, 1);
          return `1 ${fromCurrency} = ${formatNumber(rate)} ${toCurrency}`;
        })()
      : null;

  if (isPending) return <CircularProgress />;

  return (
    <Stack
      spacing={1}
      sx={{
        p: 2,
        boxShadow: "0 24px 64px rgba(0,0,0,0.18)",
        borderRadius: "24px",
        overflow: "hidden",
        width: "clamp(320px, 520px, 100%)",
      }}
    >
      <CurrencyField
        label="From"
        amount={fromAmount}
        onAmountChange={handleFromAmountChange}
        selected={fromCurrency}
        onCurrencyChange={handleFromCurrencyChange}
        autoFocus
      />

      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <IconButton
          onClick={handleSwapCurrencies}
          size="small"
          sx={{
            background: "#f0eeff",
            color: "#7c4dff",
            width: 40,
            height: 40,
            "&:hover": { background: "#e3d8ff" },
          }}
        >
          <SwapVert sx={{ fontSize: "1rem" }} />
        </IconButton>
      </Box>

      <CurrencyField
        label="To"
        amount={toAmount}
        onAmountChange={handleToAmountChange}
        selected={toCurrency}
        onCurrencyChange={handleToCurrencyChange}
      />

      {isError && (
        <Alert severity="error" sx={{ borderRadius: "12px" }}>
          Failed to load currencies. Please refresh.
        </Alert>
      )}

      {shouldShowRate ? (
        <Box sx={{ display: "flex", justifyContent: "center", minHeight: 24 }}>
          <Chip
            label={shouldShowRate}
            size="small"
            sx={{
              fontSize: "0.75rem",
              color: "text.secondary",
              background: "#f5f5f5",
            }}
          />
        </Box>
      ) : null}
    </Stack>
  );
}
