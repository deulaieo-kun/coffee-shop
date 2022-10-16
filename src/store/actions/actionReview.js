import { get, put, deleteMethod } from '../../utilities/https';

export const getAllReviews = () => {
    const url = '/review/all';
    return new Promise((resolve, reject) => {
        const promise = get(url)
        promise.then((response) => {
            resolve({
                type: 'SAVE_REVIEW_LIST',
                payload: response
            })
        }).catch((error) => {
            reject(error)
        })
    })
}