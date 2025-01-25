import { useTheme } from '@emotion/react';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import { Box, Tab } from '@mui/material';
import React, { useEffect, useState} from 'react';
import { createUseStyles } from 'react-jss';
import { useLocation, useNavigate } from 'react-router-dom';
import TabPanelCustom from './TabPanelCustom';



const useStyles = createUseStyles((theme) => ({
  box: {
    borderBottom: `1px solid ${theme.palette.divider}`,
    boxShadow: `1px 0 0 0 ${theme.palette.divider}`,
    
    color: "black",
    position: "sticky",
    top: "0px",
    zIndex: "100",
    backgroundColor: theme.palette.background.tab,
    backdropFilter: 'blur(10px)',
    '@media (max-width:600px)': {
      top: "40px"
    }
  },
  tab: {
    textTransform: "capitalize",
    color: theme.palette.color.default,
    fontSize: "15px",
    fontWeight: "500",
    padding: "1.2rem",
    '&:hover': {
      backgroundColor: theme.palette.background.hover
    },
  },
  indicator: {
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: "transparent",
    height: "4px",
  },
  indicatorChildren: {
    width: '50%',
    backgroundColor: 'rgb(120, 86, 255)',
    borderRadius: "5px"
  },
  selected: {
    fontWeight: "bold",
  }
}));

const TabLayout = ({ tabs, urls, tabPanels, extra, isSearch, errors}) => {
  const [value, setValue] = useState(0);
  const theme = useTheme();
  const styles = useStyles({ theme });
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const index = urls.indexOf(isSearch ? location.pathname + location.search : location.pathname);

    if (index !== -1) {
      setValue(index + 1);
    } else {
      setValue(1);
    }
  }, [urls, location.pathname, location.search, isSearch]);

  const handleChange = (e, newValue) => {
    setValue(newValue);
  };

  const resetScroll = () => {
    window.scrollTo(0, 0); // Scroll to the top-left corner of the page
  };

  if (value === 0) {
    return null;
  }

  return (
    <TabContext value={value}>
      <Box className={styles.box}>
        <TabList
          TabIndicatorProps={{
            className: styles.indicator,
            children: <div className={styles.indicatorChildren} />, // Adjust the width and color as needed
          }}
          textColor='inherit'
          indicatorColor='secondary'
          variant='fullWidth'
          onChange={handleChange}
        >
          {tabs.map((tab, index) => (
            <Tab
              label={tab}
              value={index + 1}
              key={index}
              onClick={() => {
                resetScroll();
                navigate(urls[index]);
              }}
              className={`${styles.tab} ${index + 1 === value ? styles.selected : ""}`}
            />
          ))}
        </TabList>
      </Box>
      {extra}
      {tabPanels.map((panel, index) => (
        <>
        {panel?.length==0 &&
        <TabPanel
        value={index + 1}>

          <h2 className="mt-2 text-center">{errors[index]}</h2>
        </TabPanel>
        }
          
        {panel?.length>0 &&
          <TabPanelCustom tabs={tabs} isSearch={isSearch} panel={panel} index={index} key={index} />
        }
        </>
        
      ))}
      
    </TabContext>
  );
};

export default TabLayout;