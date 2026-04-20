# New Episode Block Reference

Aşağıdaki referans, sağ üstte kullanılmak istenen yeni episode navigator yapısının ana mantığını gösterir.

```html
<div id="episodes-content"><div class="seasons-block seasons-block-max">
    <div id="detail-ss-list" class="detail-seasons">
        <div class="detail-infor-content">
            <div class="ss-choice">
                <div class="ssc-list">
                    <div id="ssc-list" class="ssc-button">
                        <div class="ssc-label">List of episodes:</div>
                        
                            <div class="ssc-name" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><i class="fas fa-list mr-3"></i><span id="current-page">EPS: 001-100</span><i class="fas fa-angle-down ml-2"></i></div>
                            <div class="dropdown-menu dropdown-menu-model" aria-labelledby="ssc-list">
                                
                                <a data-page="1" href="javascript:;" class="dropdown-item ep-page-item active">
                                    EPS: 001-100<i style="" class="fas fa-check ic-active ml-2"></i></a>
                                
                                <a data-page="2" href="javascript:;" class="dropdown-item ep-page-item">
                                    EPS: 101-200<i style="display: none;" class="fas fa-check ic-active ml-2"></i></a>
                                
                                <a data-page="3" href="javascript:;" class="dropdown-item ep-page-item">
                                    EPS: 201-300<i style="display: none;" class="fas fa-check ic-active ml-2"></i></a>
                                
                                <a data-page="4" href="javascript:;" class="dropdown-item ep-page-item">
                                    EPS: 301-400<i style="display: none;" class="fas fa-check ic-active ml-2"></i></a>
                                
                                <a data-page="5" href="javascript:;" class="dropdown-item ep-page-item">
                                    EPS: 401-500<i style="display: none;" class="fas fa-check ic-active ml-2"></i></a>
                                
                                <a data-page="6" href="javascript:;" class="dropdown-item ep-page-item">
                                    EPS: 501-600<i style="display: none;" class="fas fa-check ic-active ml-2"></i></a>
                                
                                <a data-page="7" href="javascript:;" class="dropdown-item ep-page-item">
                                    EPS: 601-700<i style="display: none;" class="fas fa-check ic-active ml-2"></i></a>
                                
                                <a data-page="8" href="javascript:;" class="dropdown-item ep-page-item">
                                    EPS: 701-800<i style="display: none;" class="fas fa-check ic-active ml-2"></i></a>
                                
                                <a data-page="9" href="javascript:;" class="dropdown-item ep-page-item">
                                    EPS: 801-900<i style="display: none;" class="fas fa-check ic-active ml-2"></i></a>
                                
                                <a data-page="10" href="javascript:;" class="dropdown-item ep-page-item">
                                    EPS: 901-1000<i style="display: none;" class="fas fa-check ic-active ml-2"></i></a>
                                
                                <a data-page="11" href="javascript:;" class="dropdown-item ep-page-item">
                                    EPS: 1001-1100<i style="display: none;" class="fas fa-check ic-active ml-2"></i></a>
                                
                                <a data-page="12" href="javascript:;" class="dropdown-item ep-page-item">
                                    EPS: 1101-1157<i style="display: none;" class="fas fa-check ic-active ml-2"></i></a>
                                
                            </div>
                        
                    </div>
                </div>

                <div class="ssc-quick">
                    <div class="sscq-icon"><i class="fas fa-search"></i></div>
                    <input id="search-ep" class="form-control" type="text" placeholder="Number of Ep" autocomplete="off">
                </div>
                <div class="clearfix"></div>
            </div>
            
                
                    <div id="episodes-page-1" class="ss-list ss-list-min active" data-page="1" style="">
                        
                        <a title="I'm Luffy! The Man Who's Gonna Be King of the Pirates!" class="ssl-item ep-item" data-number="1" data-id="2142" href="/watch/one-piece-100?ep=2142">
                            <div class="ssli-order" title="I'm Luffy! The Man Who's Gonna Be King of the Pirates!">1</div>
                            <div class="ssli-detail">
                                <div class="ep-name e-dynamic-name" data-jname="Ore wa Luffy! Kaizoku Ou ni Naru Otoko Da!" title="I'm Luffy! The Man Who's Gonna Be King of the Pirates!">I'm Luffy! The Man Who's Gonna Be King of the Pirates!</div>
                            </div>
                            <div class="ssli-btn">
                                <div class="btn btn-circle"><i class="fas fa-play"></i></div>
                            </div>
                            <div class="clearfix"></div>
                        </a>
                        
                        <a title="Enter the Great Swordsman! Pirate Hunter Roronoa Zoro!" class="ssl-item ep-item" data-number="2" data-id="2143" href="/watch/one-piece-100?ep=2143">
                            <div class="ssli-order" title="Enter the Great Swordsman! Pirate Hunter Roronoa Zoro!">2</div>
                            <div class="ssli-detail">
                                <div class="ep-name e-dynamic-name" data-jname="Daikengou Arawaru! Kaizokugari Roronoa Zoro" title="Enter the Great Swordsman! Pirate Hunter Roronoa Zoro!">Enter the Great Swordsman! Pirate Hunter Roronoa Zoro!</div>
                            </div>
                            <div class="ssli-btn">
                                <div class="btn btn-circle"><i class="fas fa-play"></i></div>
                            </div>
                            <div class="clearfix"></div>
                        </a>
                        
                        <a title="Morgan versus Luffy! Who" class="ssl-item ep-item" data-number="3" data-id="2144" href="/watch/one-piece-100?ep=2144">
                            <div class="ssli-order" title="Morgan versus Luffy! Who">3</div>
                            <div class="ssli-detail">
                                <div class="ep-name e-dynamic-name" data-jname="Morgan vs. Luffy! Nazo no Bishoujo wa Dare?" title="Morgan versus Luffy! Who">Morgan versus Luffy! Who</div>
                            </div>
                            <div class="ssli-btn">
                                <div class="btn btn-circle"><i class="fas fa-play"></i></div>
                            </div>
                            <div class="clearfix"></div>
                        </a>
                        
                        <a title="Luffy" class="ssl-item ep-item" data-number="4" data-id="2145" href="/watch/one-piece-100?ep=2145">
                            <div class="ssli-order" title="Luffy">4</div>
                            <div class="ssli-detail">
                                <div class="ep-name e-dynamic-name" data-jname="Luffy no Kako! Akagami no Shanks Toujou" title="Luffy">Luffy</div>
                            </div>
                            <div class="ssli-btn">
                                <div class="btn btn-circle"><i class="fas fa-play"></i></div>
                            </div>
                            <div class="clearfix"></div>
                        </a>
                        
                        <a title="A Terrifying Mysterious Power! Captain Buggy, the Clown Pirate!" class="ssl-item ep-item" da
```

## Ana fikir
- `List of episodes`
- Range selector (`EPS: 001-100`)
- Episode number search
- Numaralı grid
- Çok uzun seri senaryolarında range bazlı gezinme
