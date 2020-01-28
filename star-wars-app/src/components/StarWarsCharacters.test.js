import React from 'react';
import { render, fireEvent, wait} from '@testing-library/react';
import StarWarsCharacters from './StarWarsCharacters';
import { getData as mockGetData } from '../api';

jest.mock('../api');

test ('previous and next button work correctly and characters render on screen', async () => {
    mockGetData.mockResolvedValueOnce({
        results: [
            {name: 'Kylo Ren', url: 'kylourl'}
        ]
    });

    const { getByText } = render(<StarWarsCharacters/>)
    const nextButton =  getByText(/next/i);
    const previousButton = getByText(/previous/i);

    fireEvent.click(nextButton);
    fireEvent.click(previousButton);

    expect(mockGetData).toHaveBeenCalledTimes(1);

    await wait(() => expect(getByText(/kylo/i)));
});