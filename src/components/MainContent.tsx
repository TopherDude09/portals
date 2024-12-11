import React, { useState } from 'react';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Tabs,
  Tab,
  IconButton,
  Switch,
  FormControlLabel,
} from '@mui/material';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import CloseIcon from '@mui/icons-material/Close';
import EditIcon from '@mui/icons-material/Edit';

const MainContent: React.FC = () => {
  const [layoutSideBySide, setLayoutSideBySide] = useState(false); // Toggle for layout
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [isRightPanel, setIsRightPanel] = useState(false); // Determine panel context for Add Site
  const [name, setName] = useState('');
  const [url, setUrl] = useState('https://');
  const [tabsLeft, setTabsLeft] = useState<{ label: string; url: string }[]>([]);
  const [tabsRight, setTabsRight] = useState<{ label: string; url: string }[]>([]);
  const [selectedTabLeft, setSelectedTabLeft] = useState(0);
  const [selectedTabRight, setSelectedTabRight] = useState(0);

  const handleOpenDialog = (isRight: boolean) => {
    setIsRightPanel(isRight);
    setName('');
    setUrl('https://');
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setEditDialogOpen(false);
    setName('');
    setUrl('');
  };

  const handleSave = () => {
    if (name && url) {
      if (isRightPanel) {
        setTabsRight([...tabsRight, { label: name, url }]);
        setSelectedTabRight(tabsRight.length);
      } else {
        setTabsLeft([...tabsLeft, { label: name, url }]);
        setSelectedTabLeft(tabsLeft.length);
      }
      handleCloseDialog();
    }
  };

  const handleEdit = (index: number, isRight: boolean) => {
    const tab = isRight ? tabsRight[index] : tabsLeft[index];
    setIsRightPanel(isRight);
    setName(tab.label);
    setUrl(tab.url);
    setEditDialogOpen(true);
  };

  const handleEditSave = () => {
    if (name && url) {
      if (isRightPanel) {
        const updatedTabs = [...tabsRight];
        updatedTabs[selectedTabRight] = { label: name, url };
        setTabsRight(updatedTabs);
      } else {
        const updatedTabs = [...tabsLeft];
        updatedTabs[selectedTabLeft] = { label: name, url };
        setTabsLeft(updatedTabs);
      }
      handleCloseDialog();
    }
  };

  const handleDelete = (index: number, isRight: boolean) => {
    if (isRight) {
      const updatedTabs = tabsRight.filter((_, i) => i !== index);
      setTabsRight(updatedTabs);
      setSelectedTabRight(Math.max(0, index - 1));
    } else {
      const updatedTabs = tabsLeft.filter((_, i) => i !== index);
      setTabsLeft(updatedTabs);
      setSelectedTabLeft(Math.max(0, index - 1));
    }
  };

  const handleOpenUrl = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const renderTabLabel = (
    tab: { label: string; url: string },
    index: number,
    isRight: boolean
  ) => (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
      {tab.label}
      <IconButton size="small" onClick={() => handleOpenUrl(tab.url)}>
        <OpenInNewIcon fontSize="small" />
      </IconButton>
      <IconButton size="small" onClick={() => handleEdit(index, isRight)}>
        <EditIcon fontSize="small" />
      </IconButton>
      <IconButton size="small" onClick={() => handleDelete(index, isRight)}>
        <CloseIcon fontSize="small" />
      </IconButton>
    </Box>
  );

  const handleLeftTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setSelectedTabLeft(newValue);
  };

  const handleRightTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setSelectedTabRight(newValue);
  };

  return (
    <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      {/* Layout Toggle */}
      <Box sx={{ padding: '16px',  background: 'linear-gradient(to left, #001f3f, white)', display: 'flex', gap: '16px' }}>
        <FormControlLabel
          control={
            <Switch
              checked={layoutSideBySide}
              onChange={() => setLayoutSideBySide(!layoutSideBySide)}
              color="primary"
            />
          }
          label="Side by Side Layout"
        />
        <Button
          variant="contained"
          color="primary"
          onClick={() => handleOpenDialog(false)}
        >
          {layoutSideBySide ? 'Add Site (Left)' : 'Add Site'}
        </Button>
        {layoutSideBySide && (
          <Button variant="contained" color="primary" onClick={() => handleOpenDialog(true)}>
            Add Site (Right)
          </Button>
        )}
      </Box>

      {/* Panels Layout */}
      <Box sx={{ display: layoutSideBySide ? 'flex' : 'block', gap: '16px', height: '100%' }}>
        {/* Left Panel */}
        <Box
          sx={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            border: '1px solid #ddd',
            height: layoutSideBySide ? '100%' : 'calc(100vh - 120px)',
          }}
        >
          <Tabs
            value={selectedTabLeft}
            onChange={handleLeftTabChange}
            textColor="primary"
            indicatorColor="primary"
          >
            {tabsLeft.map((tab, index) => (
              <Tab key={index} label={renderTabLabel(tab, index, false)} />
            ))}
          </Tabs>
          {tabsLeft[selectedTabLeft] && (
            <iframe
              src={tabsLeft[selectedTabLeft].url}
              title={tabsLeft[selectedTabLeft].label}
              style={{ flexGrow: 1, width: '100%', border: 'none' }}
            />
          )}
        </Box>

        {/* Right Panel */}
        {layoutSideBySide && (
          <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', border: '1px solid #ddd' }}>
            <Tabs
              value={selectedTabRight}
              onChange={handleRightTabChange}
              textColor="primary"
              indicatorColor="primary"
            >
              {tabsRight.map((tab, index) => (
                <Tab key={index} label={renderTabLabel(tab, index, true)} />
              ))}
            </Tabs>
            {tabsRight[selectedTabRight] && (
              <iframe
                src={tabsRight[selectedTabRight].url}
                title={tabsRight[selectedTabRight].label}
                style={{ flexGrow: 1, width: '100%', border: 'none' }}
              />
            )}
          </Box>
        )}
      </Box>

      {/* Add/Edit Dialog */}
      <Dialog open={dialogOpen || editDialogOpen} onClose={handleCloseDialog}>
        <DialogTitle>{editDialogOpen ? 'Edit Website' : 'Add a Website'}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Tab Name"
            type="text"
            fullWidth
            variant="outlined"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            margin="dense"
            label="Website URL"
            type="url"
            fullWidth
            variant="outlined"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="secondary">
            Cancel
          </Button>
          <Button onClick={editDialogOpen ? handleEditSave : handleSave} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default MainContent;
