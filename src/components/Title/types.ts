import React from 'react';

type TitleType = 'list' | 'create' | 'detail' | 'edit'

export interface TitleProps{
    // children: React.ReactNode
    type:TitleType
}