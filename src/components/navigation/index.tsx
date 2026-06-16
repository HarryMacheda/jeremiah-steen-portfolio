import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Box, Button, Toolbar, Typography } from '@mui/material';

export function Navigation() {
  const [isShrunk, setIsShrunk] = useState(false);
  const [showLinks, setShowLinks] = useState(true);
  const lastScrollY = useRef(0);
  const animationFrame = useRef<number | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (window.location.pathname === '/about') {
      setIsShrunk(false);
      setShowLinks(true);
      return;
    }

    const SCROLL_THRESHOLD = 24;

    const handleScroll = () => {
      if (animationFrame.current !== null) {
        window.cancelAnimationFrame(animationFrame.current);
      }

      animationFrame.current = window.requestAnimationFrame(() => {
        const currentScrollY = window.scrollY;
        const delta = currentScrollY - lastScrollY.current;
        const scrollingUp = delta < -SCROLL_THRESHOLD;
        const scrollingDown = delta > SCROLL_THRESHOLD;
        const nextIsShrunk = currentScrollY > 0;

        setIsShrunk((prev) => (prev === nextIsShrunk ? prev : nextIsShrunk));
        setShowLinks((prev) => {
          if (currentScrollY === 0) return true;
          if (scrollingUp) return true;
          if (scrollingDown) return false;
          return prev;
        });

        lastScrollY.current = currentScrollY;
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (animationFrame.current !== null) {
        window.cancelAnimationFrame(animationFrame.current);
      }
    };
  }, [window.location.pathname]);

  return (
    <AppBar
      position="sticky"
      color="transparent"
      elevation={isShrunk ? 4 : 0}
      sx={(theme) => ({
        backgroundColor: isShrunk ? theme.palette.background.paper : 'transparent',
        color: theme.palette.text.primary,
        transition: 'all 220ms ease',
        overflow: 'hidden',
        py: 0,
        boxShadow: isShrunk ? theme.shadows[4] : 'none',
      })}
    >
      <Toolbar
        sx={(theme) => ({
          minHeight: '0 !important',
          flexDirection: 'column',
          alignItems: 'center',
          gap: showLinks ? 2 : 0,
          py: isShrunk ? 1.5 : 5,
          transition: 'padding 220ms ease',
          [theme.breakpoints.up('sm')]: {
            minHeight: '0 !important',
          },
        })}
      >
        <Link to="/" style={{ textDecoration: 'none', color: 'inherit', textAlign: 'center' }}>
          <Typography
            variant="h1"
            sx={{
              fontSize: isShrunk ? '22px' : '126px',
              transition: 'font-size 220ms ease',
              lineHeight: 1,
            }}
          >
            JEREMIAH STEEN.
          </Typography>
        </Link>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            gap: 3,
            flexWrap: 'wrap',
            transition: 'opacity 220ms ease, transform 220ms ease, height 220ms ease',
            opacity: showLinks ? 1 : 0,
            transform: showLinks ? 'translateY(0)' : 'translateY(-20px)',
            height: showLinks ? 'auto' : 0,
            overflow: 'hidden',
            pointerEvents: showLinks ? 'auto' : 'none',
          }}
        >
          <Button
            component={Link}
            to="/"
            sx={{
              color: 'inherit',
              fontFamily: 'Archivo Black, sans-serif',
              fontSize: isShrunk ? '0.825rem' : '1rem',
              minWidth: 'auto',
              padding: 0,
            }}
          >
            Work
          </Button>
          <Button
            component={Link}
            to="/about"
            sx={{
              color: 'inherit',
              fontFamily: 'Archivo Black, sans-serif',
              fontSize: isShrunk ? '0.825rem' : '1rem',
              minWidth: 'auto',
              padding: 0,
            }}
          >
            About
          </Button>
          <Button
            component={Link}
            to="/about"
            sx={{
              color: 'inherit',
              fontFamily: 'Archivo Black, sans-serif',
              fontSize: isShrunk ? '0.825rem' : '1rem',
              minWidth: 'auto',
              padding: 0,
            }}
          >
            Contact
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
