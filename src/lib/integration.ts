import { apiClient, ApiResponse } from "./api-utils";
import { logger } from "./logger";
import { PerformanceMonitor } from "./performance-utils";
import { ErrorHandler } from "./error-handling";

export class IntegrationService {
  private performanceMonitor: PerformanceMonitor;
  private errorHandler: ErrorHandler;

  constructor() {
    this.performanceMonitor = new PerformanceMonitor();
    this.errorHandler = new ErrorHandler();
  }

  async fetchWithMonitoring<T>(
    endpoint: string,
    options?: RequestInit
  ): Promise<ApiResponse<T>> {
    const operationId = `api-${endpoint}`;
    this.performanceMonitor.start(operationId);
    logger.info(`Fetching ${endpoint}`, { options });

    try {
      const response = await apiClient.get<T>(endpoint, options);
      
      if (response.error) {
        this.errorHandler.report({
          message: response.error,
          code: "API_ERROR",
          context: { endpoint, options },
        });
        logger.error(`Failed to fetch ${endpoint}`, response.error);
      } else {
        logger.info(`Successfully fetched ${endpoint}`);
      }

      this.performanceMonitor.stop(operationId);
      return response;
    } catch (error) {
      this.performanceMonitor.stop(operationId);
      this.errorHandler.report({
        message: error instanceof Error ? error.message : "Unknown error",
        code: "NETWORK_ERROR",
        context: { endpoint, options },
      });
      logger.error(`Exception fetching ${endpoint}`, error);
      throw error;
    }
  }

  async postWithMonitoring<T>(
    endpoint: string,
    body?: unknown,
    options?: RequestInit
  ): Promise<ApiResponse<T>> {
    const operationId = `api-post-${endpoint}`;
    this.performanceMonitor.start(operationId);
    logger.info(`Posting to ${endpoint}`, { body, options });

    try {
      const response = await apiClient.post<T>(endpoint, body, options);
      
      if (response.error) {
        this.errorHandler.report({
          message: response.error,
          code: "API_ERROR",
          context: { endpoint, body, options },
        });
        logger.error(`Failed to post to ${endpoint}`, response.error);
      } else {
        logger.info(`Successfully posted to ${endpoint}`);
      }

      this.performanceMonitor.stop(operationId);
      return response;
    } catch (error) {
      this.performanceMonitor.stop(operationId);
      this.errorHandler.report({
        message: error instanceof Error ? error.message : "Unknown error",
        code: "NETWORK_ERROR",
        context: { endpoint, body, options },
      });
      logger.error(`Exception posting to ${endpoint}`, error);
      throw error;
    }
  }

  getPerformanceMetrics() {
    return this.performanceMonitor.getMetrics();
  }

  subscribeToErrors(callback: (error: unknown) => void) {
    return this.errorHandler.subscribe(callback);
  }
}

export const integrationService = new IntegrationService();

