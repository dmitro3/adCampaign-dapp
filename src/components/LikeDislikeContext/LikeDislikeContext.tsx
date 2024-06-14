import React, { createContext, useContext, ReactNode } from 'react';
import { updateLike } from '../../common/services/api.services';

interface LikesContextType {
    like: { [key: string]: { like: number, dislike: number } };
    updateLikes: (campaignId: string, userId: string) => Promise<{ likes: number, dislikes: number }> ;
    updateDislikes: (campaignId: string, userId: string) => Promise<{ likes: number, dislikes: number }> ;
}

const LikesContext = createContext<LikesContextType | undefined>(undefined);

interface LikesProviderProps {
    children: ReactNode;
}

export const LikesProvider: React.FC<LikesProviderProps> = ({ children }) => {

    const updateLikes = async (campaignId: string, userId: string) => {
        try {
            const data = await updateLike(campaignId, userId, 'like');
            return data 
        } catch (error) {
            console.error('Failed to update likes', error);
        }
    };

    const updateDislikes = async (campaignId: string, userId: string) => {
        try {
            const data = await updateLike(campaignId, userId, 'dislike');
            return data 
        } catch (error) {
            console.error('Failed to update dislikes', error);
        } 
    };

    return (
        <LikesContext.Provider value={{like: {}, updateLikes, updateDislikes }}>
            {children}
        </LikesContext.Provider>
    );
};

export const useLikes = (): LikesContextType => {
    const context = useContext(LikesContext);
    if (!context) {
        throw new Error('useLikes must be used within a LikesProvider');
    }
    return context;
};
