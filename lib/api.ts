import {ProductsData} from "@/types/productTypes";

export class ApiError extends Error {
    constructor(
        message: string,
        public readonly status: number,
        public readonly statusText: string,
    ) {
        super(message);
        this.name = "ApiError";
    }
}

function getConfig(): { url: string; key: string } {
    const url = process.env.COLUMBUS_API_URL;
    const key = process.env.COLUMBUS_API_KEY;

    if (!url || !key) {
        throw new Error(
            "Missing COLUMBUS_API_URL or COLUMBUS_API_KEY environment variables. " +
            "Copy .env.example to .env.local and fill in the values.",
        );
    }

    return { url, key };
}

export async function fetchData(): Promise<ProductsData> {
    const { url, key } = getConfig();

    const response = await fetch(url, {
        headers: {
            "x-api-key": key,
            Accept: "application/json",
        },
        next: { revalidate: 60 },
    });

    if (!response.ok) {
        throw new ApiError(
            `Failed to fetch recruitment data: ${response.status} ${response.statusText}`,
            response.status,
            response.statusText,
        );
    }

    return (await response.json()) as ProductsData;
}