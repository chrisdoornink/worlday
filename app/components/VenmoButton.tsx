import { IconButton, Link, Tooltip } from '@mui/material';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';

interface VenmoButtonProps {
  venmoUsername: string;
}

export const VenmoButton: React.FC<VenmoButtonProps> = ({ venmoUsername }) => {
  return (
    <Tooltip title="Support on Venmo" arrow placement="left">
      <Link
        href={`https://venmo.com/${venmoUsername}`}
        target="_blank"
        rel="noopener noreferrer"
        sx={{
          position: 'fixed',
          bottom: 16,
          right: 16,
          textDecoration: 'none',
          zIndex: 1000,
        }}
      >
        <IconButton
          sx={{
            backgroundColor: '#008CFF',
            color: 'white',
            '&:hover': {
              backgroundColor: '#0074D4',
            },
            width: 40,
            height: 40,
          }}
        >
          <AccountBalanceWalletIcon />
        </IconButton>
      </Link>
    </Tooltip>
  );
};
