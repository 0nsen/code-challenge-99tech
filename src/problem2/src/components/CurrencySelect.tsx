import React, { useState, useRef, useEffect } from "react";
import {
  Popover,
  TextField,
  InputAdornment,
  Typography,
  Box,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { useCurrencies } from "../hooks/useCurrencies";
import { formatNumber } from "../utils/format";
import TokenIcon from "./TokenIcon";

interface CurrencySelectorProps {
  selected: string;
  onChange: (currency: string) => void;
}

export const CurrencySelect: React.FC<CurrencySelectorProps> = ({
  selected,
  onChange,
}) => {
  const { data: currencies, isSuccess } = useCurrencies();
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const [search, setSearch] = useState("");
  const searchRef = useRef<HTMLInputElement>(null);
  const open = Boolean(anchorEl);

  const entries = isSuccess
    ? Array.from(currencies.entries())
        .map(([currency, price]) => ({ currency, price }))
        .filter((e) => e.currency.toLowerCase().includes(search.toLowerCase()))
        .sort((a, b) => a.currency.localeCompare(b.currency))
    : [];

  useEffect(() => {
    if (open) {
      setTimeout(() => searchRef.current?.focus(), 50);
    } else {
      setSearch("");
    }
  }, [open]);

  const handleOpen = (e: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(e.currentTarget);
  };

  const handleClose = () => setAnchorEl(null);

  const handleSelect = (currency: string) => {
    onChange(currency);
    handleClose();
  };

  return (
    <>
      <button
        onClick={handleOpen}
        style={{
          display: "flex",
          alignItems: "center",
          gap: "8px",
          background: "none",
          border: "none",
          cursor: "pointer",
          padding: "4px 2px",
          borderRadius: "8px",
          transition: "background 0.15s",
        }}
      >
        <TokenIcon currency={selected} size={28} />
        <Typography
          sx={{
            fontWeight: 700,
            fontSize: "1rem",
            color: "text.primary",
          }}
        >
          {selected}
        </Typography>
        <KeyboardArrowDownIcon
          sx={{
            color: "text.secondary",
            fontSize: "1rem",
            transition: "transform 0.2s",
            transform: open ? "rotate(180deg)" : "rotate(0deg)",
          }}
        />
      </button>

      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        slotProps={{
          paper: {
            sx: {
              width: 320,
              maxHeight: 420,
              borderRadius: "16px",
              boxShadow: "0 8px 32px rgba(0,0,0,0.12)",
              overflow: "hidden",
              display: "flex",
              flexDirection: "column",
            },
          },
        }}
      >
        <Box sx={{ p: 1, borderBottom: "1px solid", borderColor: "divider" }}>
          <TextField
            inputRef={searchRef}
            size="small"
            fullWidth
            placeholder="Search token..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon
                      sx={{ fontSize: "1rem", color: "text.disabled" }}
                    />
                  </InputAdornment>
                ),
              },
            }}
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: "10px",
                fontSize: "0.875rem",
              },
            }}
          />
        </Box>

        <Box sx={{ overflowY: "auto", flex: 1 }}>
          {entries.length == 0 ? (
            <Typography
              sx={{
                p: 3,
                textAlign: "center",
                color: "text.secondary",
                fontSize: "0.875rem",
              }}
            >
              No tokens found
            </Typography>
          ) : (
            entries.map(({ currency, price }) => {
              const isSelected = currency === selected;

              return (
                <Box
                  key={currency}
                  onClick={() => handleSelect(currency)}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                    px: 2,
                    py: 1,
                    cursor: "pointer",
                    backgroundColor: isSelected
                      ? "action.selected"
                      : "transparent",
                    "&:hover": { backgroundColor: "action.hover" },
                    transition: "background 0.12s",
                  }}
                >
                  <TokenIcon currency={currency} size={32} />
                  <Box sx={{ flex: 1 }}>
                    <Typography
                      sx={{
                        fontWeight: isSelected ? 700 : 500,
                        fontSize: "0.875rem",
                        color: "text.primary",
                      }}
                    >
                      {currency}
                    </Typography>
                  </Box>
                  <Typography
                    sx={{
                      fontSize: "0.8rem",
                      color: "text.secondary",
                    }}
                  >
                    {formatNumber(price, {
                      style: "currency",

                      currency: "USD",
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 6,
                    })}
                  </Typography>
                </Box>
              );
            })
          )}
        </Box>
      </Popover>
    </>
  );
};
