import { useState, useEffect } from 'react';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';




import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Snackbar from '@mui/material/Snackbar';

const DisplayError = ({ error }) => {

    const [open, setOpen] = useState(error ? true : false);

    useEffect(() => {

        setOpen(error ? true : false);

    }, [error]);

    return (
        <div className="w-full flex justify-center mt-8">
            <div className='w-11/12'>
                <Snackbar open={open}>
                    <Alert severity="error"
                        action={
                            <IconButton
                                aria-label="close"
                                color="inherit"
                                size="small"
                                onClick={() => {
                                    setOpen(false);
                                }}
                            >
                                <CloseIcon fontSize="inherit" />
                            </IconButton>
                        }
                    >
                        <AlertTitle>Error</AlertTitle>
                        <strong> {error?.message} </strong>
                    </Alert>
                </Snackbar>
            </div>
        </div>
    )
}

export default DisplayError