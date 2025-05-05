import { describe, it, expect, vi } from 'vitest'
import { getJsonFromApi } from '../src/main.js'
import fetch from 'node-fetch'

vi.mock('node-fetch', async () => {
    const actual = await vi.importActual('node-fetch')
    return {
        ...actual,
        default: vi.fn(),
    }
})

describe('getJsonFromApi', () => {
    it('returns data when API responds successfully', async () => {
        // Mock a fake response
        fetch.mockResolvedValue({
            ok: true,
            json: async () => ({
                stats: {
                    "btc-usdt": { latest: "60000" },
                    "usdt-rls": { latest: "50000" }
                }
            }),
        })

        const data = await getJsonFromApi()
        expect(data).toBeDefined()
        expect(data.stats["btc-usdt"].latest).toBe("60000")
        expect(data.stats["usdt-rls"].latest).toBe("50000")
    })

    it('returns null when API call fails', async () => {
        fetch.mockRejectedValue(new Error('Network error'))

        const data = await getJsonFromApi()
        expect(data).toBeNull()
    })
})
