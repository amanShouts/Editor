/* eslint-disable react/prop-types */
import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { useEffect } from 'react';

export default function ResponsiveDialog({ openDialog, setConfirmationAnswer }) {
    const [open, setOpen] = React.useState(false);
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

    useEffect(() => {
        if (openDialog == true) {
            console.log(" click an open now inside dialog")
            handleClickOpen()
        }
    }, [openDialog])

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = (answer) => {
        setConfirmationAnswer(prev => answer)
        setOpen(false);
    };

    return (
        <div>
            {/* <Button variant="outlined" onClick={handleClickOpen}>
                Open responsive dialog
            </Button> */}
            <Dialog
                fullScreen={fullScreen}
                open={open}
                onClose={handleClose}
                aria-labelledby="responsive-dialog-title"
            >
                <DialogTitle id="responsive-dialog-title">
                    {"Content MisMatch "}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Hey, We found that content of the version you are restoring differs from the content in the editor.
                        Do you wish to overwrite ?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => { handleClose(false) }}>
                        No
                    </Button>
                    <Button onClick={() => { handleClose(true) }} autoFocus>
                        Yes
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}