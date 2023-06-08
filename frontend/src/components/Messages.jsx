import React from 'react';

export const Messages = () => {
    return (
        <div>
            <div className="p-4 mb-4 text-sm text-blue-700 bg-blue-100 rounded-lg dark:bg-blue-200 dark:text-blue-800" role="alert">
                <span className="font-medium">Info alert!</span> Change a few things up and try submitting again.
            </div>
            <div className="p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-800" role="alert">
                <span className="font-medium">Danger alert!</span> Change a few things up and try submitting again.
            </div>
            <div className="p-4 mb-4 text-sm text-green-700 bg-green-100 rounded-lg dark:bg-green-200 dark:text-green-800" role="alert">
                <span className="font-medium">Success alert!</span> Change a few things up and try submitting again.
            </div>
        </div>
    )
}
