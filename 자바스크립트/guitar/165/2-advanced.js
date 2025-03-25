// ... existing code ...

class InMemoryCache extends CacheInterface {
  ttl = 1000; // time to live (milliseconds)
  maxSize = 100; // 최대 캐시 항목 수
  constructor(apiService, options = {}) {
    super();
    this.cache = new Map();
    this.fetch = apiService.fetch;

    // 옵션 설정
    if (options.ttl) this.ttl = options.ttl;
    if (options.maxSize) this.maxSize = options.maxSize;

    // 통계 추적
    this.stats = {
      hits: 0,
      misses: 0,
      sets: 0,
      deletes: 0,
    };
  }

  async get(key, refetch = false) {
    if (!this.cache.has(key) || refetch) {
      this.stats.misses++;
      const result = await this.fetch(key);
      if (result) {
        this.set(key, result);
        return Object.assign(result, { status: "Fresh" });
      }
      return undefined;
    }

    const { value, timestamp } = this.cache.get(key);
    const timeGapInMs = new Date() - timestamp;
    const isStale = timeGapInMs > this.ttl;

    if (isStale) {
      return await this.get(key, true);
    }

    this.stats.hits++;
    // 최근 사용 항목을 맨 앞으로 이동 (LRU 구현)
    this._updateAccessTime(key);
    return Object.assign(value, { status: "Cached" });
  }

  set(key, value) {
    this.stats.sets++;
    // 캐시 크기 제한 확인
    if (this.cache.size >= this.maxSize && !this.cache.has(key)) {
      this._evictOldest();
    }
    this.cache.set(key, {
      value,
      timestamp: new Date(),
      lastAccessed: new Date(),
    });
  }

  delete(key) {
    this.stats.deletes++;
    return this.cache.delete(key);
  }

  clear() {
    this.cache.clear();
    this.stats = { hits: 0, misses: 0, sets: 0, deletes: 0 };
  }

  setCacheRefresh(ttl) {
    this.ttl = ttl;
  }

  getStats() {
    const hitRate =
      this.stats.hits + this.stats.misses > 0
        ? (this.stats.hits / (this.stats.hits + this.stats.misses)) * 100
        : 0;

    return {
      ...this.stats,
      size: this.cache.size,
      hitRate: `${hitRate.toFixed(2)}%`,
    };
  }

  // LRU 캐시 구현을 위한 헬퍼 메서드
  _updateAccessTime(key) {
    const item = this.cache.get(key);
    item.lastAccessed = new Date();
    this.cache.set(key, item);
  }

  _evictOldest() {
    let oldestKey = null;
    let oldestTime = Date.now();

    for (const [key, item] of this.cache.entries()) {
      if (item.lastAccessed < oldestTime) {
        oldestTime = item.lastAccessed;
        oldestKey = key;
      }
    }

    if (oldestKey) {
      this.delete(oldestKey);
    }
  }
}

// ... existing code ...
