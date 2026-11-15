import { calculateStrength, retryWithBackoff } from './lib/securityUtils.js';

describe('calculateStrength', () => {
  it('should return a score of 0 for an empty password', () => {
    const { score, entropy, feedback } = calculateStrength('');
    expect(score).toBe(0);
    expect(entropy).toBe(0);
    expect(feedback).toEqual(['Password is empty.']);
  });

  describe('retryWithBackoff', () => {
    it('does not retry aborted requests', async () => {
      const abortError = new Error('Request timed out');
      abortError.name = 'AbortError';
      const request = jest.fn().mockRejectedValue(abortError);

      await expect(
        retryWithBackoff(request, 3, 0, error => error.name !== 'AbortError')
      ).rejects.toBe(abortError);
      expect(request).toHaveBeenCalledTimes(1);
    });
  });

  it('should return a low score for a weak password like "password"', () => {
    const { score, feedback } = calculateStrength('password');
    expect(score).toBeLessThan(20);
    expect(feedback).toContain('Requires uppercase (A-Z).');
    expect(feedback).toContain('Requires numbers (0-9).');
    expect(feedback).toContain('Requires symbols (!@#$).');
  });

  it('should return a high score for a strong password', () => {
    const { score, entropy, feedback } = calculateStrength('S3cur3P@ssw0rd!2024');
    expect(score).toBeGreaterThan(90);
    expect(entropy).toBeGreaterThan(100);
    expect(feedback.length).toBe(0);
  });
});