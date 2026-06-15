import { Box } from "@mui/material";
import { TOKEN_ICON_URL } from "../constants";

type Props = {
  currency: string;
  size?: number;
};

export default function TokenIcon(props: Props) {
  const { currency, size = 28 } = props;
  const src = `${TOKEN_ICON_URL}/${currency}.svg`;

  return (
    <Box
      sx={{ width: size, height: size, flexShrink: 0, position: "relative" }}
    >
      <img
        src={src}
        alt={currency}
        width={size}
        height={size}
        style={{
          borderRadius: "50%",
          objectFit: "contain",
        }}
      />
    </Box>
  );
}
