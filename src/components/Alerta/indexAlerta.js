import * as React from 'react';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

export default function ActionAlerts({ severidade, mensagem, visivel, acaoFechar }) {

    return (
         (
            <Stack sx={{ width: '100%' }} spacing={2}>
                <Alert severity={severidade} onClose={() => {acaoFechar()}}>
                    {mensagem}
                </Alert>
            </Stack>
        )
    );
}